// client.cpp
#include <iostream>
#include <thread>
#include <unistd.h>
#include <arpa/inet.h>

using namespace std;

// Receive messages from server
void receiveMessages(int sock) {
    char buffer[1024];

    while (true) {
        int bytes = recv(sock, buffer, sizeof(buffer), 0);

        if (bytes <= 0) {
            cout << "Disconnected from server.\n";
            break;
        }

        string msg(buffer, bytes);
        cout << "\nMessage: " << msg << endl;
    }
}

int main() {
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(8080);
    inet_pton(AF_INET, "127.0.0.1", &serverAddr.sin_addr);

    connect(sock, (sockaddr*)&serverAddr, sizeof(serverAddr));

    cout << "Connected to server!\n";

    // Start thread for receiving messages
    thread recvThread(receiveMessages, sock);
    recvThread.detach();

    // Send messages
    while (true) {
        string msg;
        getline(cin, msg);

        send(sock, msg.c_str(), msg.size(), 0);
    }

    close(sock);
    return 0;
}