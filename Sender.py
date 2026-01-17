import socket
import json
import os
import struct
import base64
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

# ==============================
# USER SECRET KEY (256-bit)
# ==============================
USER_SECRET_KEY = bytes.fromhex(
    "9f4c2e1d7a9b0c8e6d3f1a5b4e2c7d90"
    "81a2b3c4d5e6f708192a3b4c5d6e7f80"
)

# ==============================
# TARGET USER IP (EXAMPLE)
# ==============================
TARGET_IP = "10.72.234.243"
TARGET_PORT = 9090

# ==============================
# ORIGINAL MESSAGE
# ==============================
transaction_data = {
    "name": "Talwinder",
    "phone": "+91-9876543210",
    "amount": "12450.00",
    "currency": "INR",
    "date": "2026-01-17",
    "time": "14:32:08",
    "sent_to": "Amazon India Pvt Ltd",
    "message": "Debit transaction successful"
}

plaintext = json.dumps(transaction_data, separators=(",", ":")).encode()

print("\n🔓 ORIGINAL MESSAGE (PLAINTEXT)")
print(plaintext.decode())

# ==============================
# ENCRYPT
# ==============================
aesgcm = AESGCM(USER_SECRET_KEY)
iv = os.urandom(12)
ciphertext = aesgcm.encrypt(iv, plaintext, None)

print("\n🔒 ENCRYPTED MESSAGE (BASE64)")
print(base64.b64encode(ciphertext).decode())

# ==============================
# BUILD CUSTOM TCP PAYLOAD
# ==============================
PROTOCOL_VERSION = 0x01
MESSAGE_TYPE = 0x02

payload_length = len(iv) + len(ciphertext)

tcp_payload = struct.pack(
    "!BBH",
    PROTOCOL_VERSION,
    MESSAGE_TYPE,
    payload_length
) + iv + ciphertext

# ==============================
# SEND OVER TCP
# ==============================
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((TARGET_IP, TARGET_PORT))
client.sendall(tcp_payload)
client.close()

print(f"\n✅ Encrypted payload sent to {TARGET_IP}:{TARGET_PORT}")