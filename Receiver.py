import socket
import struct
import json
import base64
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# ==============================
# USER SECRET KEY
# ==============================
USER_SECRET_KEY = bytes.fromhex(
    "9f4c2e1d7a9b0c8e6d3f1a5b4e2c7d90"
    "81a2b3c4d5e6f708192a3b4c5d6e7f80"
)

HOST = "127.0.0.1"
PORT = 9090

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind((HOST, PORT))
server.listen(1)

print("[+] Listening on 127.0.0.1:9090...")

conn, addr = server.accept()
print(f"[+] Connection from {addr}")

data = conn.recv(4096)

# ==============================
# PARSE PAYLOAD
# ==============================
version, msg_type, payload_len = struct.unpack("!BBH", data[:4])
iv = data[4:16]
ciphertext = data[16:]

print("\n🔒 RECEIVED ENCRYPTED MESSAGE (BASE64)")
print(base64.b64encode(ciphertext).decode())

# ==============================
# DECRYPT
# ==============================
aesgcm = AESGCM(USER_SECRET_KEY)
plaintext = aesgcm.decrypt(iv, ciphertext, None)

print("\n🔓 DECRYPTED ORIGINAL MESSAGE")
print(json.loads(plaintext.decode()))

conn.close()
server.close()
