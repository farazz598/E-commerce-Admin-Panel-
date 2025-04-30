from flask import Blueprint, request, jsonify
from app import mysql  # ✅ import the shared mysql instance
from flask_jwt_extended import jwt_required

products_bp = Blueprint('products', __name__)

@products_bp.route('/api/products', methods=['GET'])
@jwt_required()
def get_all_products():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM products")
    rows = cur.fetchall()
    cur.close()
    products = [{
        'id': row[0],
        'name': row[1],
        'description': row[2],
        'price': float(row[3]),
        'quantity': row[4],
        'image_url': row[5]
    } for row in rows]
    return jsonify(products)

@products_bp.route('/api/products', methods=['POST'])
@jwt_required()
def add_product():
    data = request.json
    name = data.get('name')
    description = data.get('description', '')
    price = data.get('price')
    quantity = data.get('quantity')
    image_url = data.get('image_url', '')
    
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO products (name, description, price, quantity, image_url) VALUES (%s, %s, %s, %s, %s)",
                (name, description, price, quantity, image_url))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Product added successfully'}), 201

@products_bp.route('/api/products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM products WHERE id = %s", (id,))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Product deleted successfully'})

@products_bp.route('/api/products/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    data = request.json
    name = data.get('name')
    description = data.get('description', '')
    price = data.get('price')
    quantity = data.get('quantity')
    image_url = data.get('image_url', '')

    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE products
        SET name = %s, description = %s, price = %s, quantity = %s, image_url = %s
        WHERE id = %s
    """, (name, description, price, quantity, image_url, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Product updated successfully'})