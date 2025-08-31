from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def solve_hanoi(n, source, target, auxiliary, moves):
    if n == 1:
        moves.append((source, target))
        return
    solve_hanoi(n - 1, source, auxiliary, target, moves)
    moves.append((source, target))
    solve_hanoi(n - 1, auxiliary, target, source, moves)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    data = request.get_json()
    n = data.get('num_disks', 3)
    if n > 6:
        n = 6  
    moves = []
    solve_hanoi(n, 'A', 'C', 'B', moves)
    return jsonify(moves)

if __name__ == '__main__':
    app.run(debug=True)