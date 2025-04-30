

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from app import mysql
from passlib.hash import pbkdf2_sha256

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    cur = mysql.connection.cursor()
    cur.execute("SELECT password_hash FROM admins WHERE email = %s", (email,))
    result = cur.fetchone()
    cur.close()

    if result:
        password_hash = result[0].strip()
        if pbkdf2_sha256.verify(password, password_hash):
            token = create_access_token(identity=email)
            return jsonify({ 'token': token })

    return jsonify({ 'error': 'Invalid credentials' }), 401

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    hashed = pbkdf2_sha256.hash(password)
    cur = mysql.connection.cursor()
    try:
        cur.execute("INSERT INTO admins (email, password_hash) VALUES (%s, %s)", (email, hashed))
        mysql.connection.commit()
        cur.close()
        return jsonify({ 'message': 'User registered successfully' }), 201
    except:
        cur.close()
        return jsonify({ 'error': 'Email already exists or DB error' }), 400




