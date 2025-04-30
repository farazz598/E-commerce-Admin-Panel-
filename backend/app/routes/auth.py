from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app import mysql
from passlib.hash import pbkdf2_sha256

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    print("Login attempt:", email, password)

    cur = mysql.connection.cursor()
    cur.execute("SELECT password_hash FROM admins WHERE email = %s", (email,))
    result = cur.fetchone()
    cur.close()

    print("From DB:", result)

    if result:
        password_hash = result[0].strip()
        if pbkdf2_sha256.verify(password, password_hash):
            print("✅ Password matched")
            token = create_access_token(identity=email)
            return jsonify({'token': token})

    print("❌ Invalid login")
    print(pbkdf2_sha256.hash("admin123"))
    return jsonify({'error': 'Invalid credentials'}), 401
