from flask import Blueprint, jsonify
from app import mysql
from flask_jwt_extended import jwt_required

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/api/stats', methods=['GET'])
@jwt_required()
def get_stats():
    cur = mysql.connection.cursor()

    cur.execute("SELECT COUNT(*) FROM products")
    product_count = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM orders")
    order_count = cur.fetchone()[0]

    cur.close()

    return jsonify({
        'total_products': product_count,
        'total_orders': order_count
    })
