

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import mysql

products_bp = Blueprint('products', __name__)

@products_bp.route('/api/products', methods=['GET'])
@jwt_required()
def get_products():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM products")
    rows = cur.fetchall()
    cur.close()
    products = [{
        'id': row[0], 'name': row[1], 'description': row[2],
        'price': float(row[3]), 'quantity': row[4], 'image_url': row[5]
    } for row in rows]
    return jsonify(products)

@products_bp.route('/api/products', methods=['POST'])
@jwt_required()
def add_product():
    data = request.json
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO products (name, description, price, quantity, image_url) VALUES (%s, %s, %s, %s, %s)",
                (data['name'], data['description'], data['price'], data['quantity'], data['image_url']))
    mysql.connection.commit()
    cur.close()
    return jsonify({ 'message': 'Product added successfully' }), 201

@products_bp.route('/api/products/<int:id>', methods=['GET'])
@jwt_required()
def get_product(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM products WHERE id = %s", (id,))
    row = cur.fetchone()
    cur.close()
    if not row:
        return jsonify({ 'error': 'Product not found' }), 404
    product = {
        'id': row[0], 'name': row[1], 'description': row[2],
        'price': float(row[3]), 'quantity': row[4], 'image_url': row[5]
    }
    return jsonify(product)

@products_bp.route('/api/products/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    data = request.json
    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE products
        SET name = %s, description = %s, price = %s, quantity = %s, image_url = %s
        WHERE id = %s
    """, (data['name'], data['description'], data['price'], data['quantity'], data['image_url'], id))
    mysql.connection.commit()
    cur.close()
    return jsonify({ 'message': 'Product updated successfully' })

@products_bp.route('/api/products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM products WHERE id = %s", (id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({ 'message': 'Product deleted successfully' })
