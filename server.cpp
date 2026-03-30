// server.cpp
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <algorithm>
#include <unistd.h>
#include <arpa/inet.h>

using namespace std;

vector<int> clients;
mutex mtx;

// Broadcast message to all clients except sender
void broadcastMessage(string msg, int senderSock) {
    lock_guard<mutex> lock(mtx);
    for (int client : clients) {
        if (client != senderSock) {
            send(client, msg.c_str(), msg.size(), 0);
        }
    }
}

// Handle each client
void handleClient(int clientSocket) {
    char buffer[1024];

    while (true) {
        int bytes = recv(clientSocket, buffer, sizeof(buffer), 0);

        if (bytes <= 0) {
            cout << "Client disconnected: " << clientSocket << endl;
            break;
        }

        string msg(buffer, bytes);
        cout << "Received: " << msg << endl;

        broadcastMessage(msg, clientSocket);
    }

    close(clientSocket);

    // Remove client safely
    lock_guard<mutex> lock(mtx);
    clients.erase(remove(clients.begin(), clients.end(), clientSocket), clients.end());
}

int main() {
    int serverSock = socket(AF_INET, SOCK_STREAM, 0);

    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(8080);
    serverAddr.sin_addr.s_addr = INADDR_ANY;

    bind(serverSock, (sockaddr*)&serverAddr, sizeof(serverAddr));
    listen(serverSock, 10);

    cout << "Server started on port 8080..." << endl;

    while (true) {
        int clientSocket = accept(serverSock, nullptr, nullptr);

        cout << "New client connected: " << clientSocket << endl;

        {
            lock_guard<mutex> lock(mtx);
            clients.push_back(clientSocket);
        }

        thread t(handleClient, clientSocket);
        t.detach();
    }

    close(serverSock);
    return 0;
}