#include <vector>
#include <random>
#include <chrono>
#include <algorithm>
#include <ctime>
#include <cmath>
#include <iostream>

// Global variables (matching Python global state)
std::vector<int> bag = {0, 1, 2, 3, 4, 5, 6};
std::vector<std::vector<std::vector<int>>> activePos = {
    {{0, 3}, {0, 4}, {0, 5}, {0, 6}},
    {{0, 3}, {1, 3}, {1, 4}, {1, 5}},
    {{0, 5}, {1, 5}, {1, 4}, {1, 3}},
    {{0, 4}, {0, 5}, {1, 4}, {1, 5}},
    {{0, 4}, {0, 5}, {1, 4}, {1, 3}},
    {{0, 3}, {0, 4}, {1, 4}, {1, 5}},
    {{0, 4}, {1, 3}, {1, 4}, {1, 5}}
};

std::vector<std::vector<int>> active;
int hold, shape, next;
bool held = false;
int level = 0;
int lines = 0;
int rot = 0;
int score = 0;
int counterx = 3;
std::vector<std::vector<bool>> board(20, std::vector<bool>(10, false));
std::mt19937 rng(std::random_device{}());

// Helper function to get random element and remove it from vector
int getRandomAndRemove(std::vector<int>& vec) {
    if (vec.empty()) return 0;
    std::uniform_int_distribution<int> dist(0, vec.size() - 1);
    int index = dist(rng);
    int value = vec[index];
    vec.erase(vec.begin() + index);
    return value;
}

bool createNewPiece() {
    held = false;
    std::cout <<shape<<" "<<next<<std::endl;
    // Place current piece on board
    for (const auto& pos : active) {
        board[pos[0]][pos[1]] = true;
    }

    // Check for completed lines
    int line = 0;
    for (int i = 0; i < 20; i++) {
        if (std::all_of(board[i].begin(), board[i].end(), [](bool x) { return x; })) {
            board.erase(board.begin() + i);
            board.insert(board.begin(), std::vector<bool>(10, false));
            line++;
        }
    }
    lines += line;

    // Calculate score based on lines cleared
    std::vector<int> lineScores = {0, 40, 100, 300, 1200};
    score += lineScores[line] * (level + 1);
    
    // Update level
    level = lines / 10;

    // Update current and next pieces
    shape = next;
    active = activePos[shape];

    // Refill bag if empty
    if (bag.empty()) {
        bag = {0, 1, 2, 3, 4, 5, 6};
    }

    next = getRandomAndRemove(bag);
    rot = 0;

    // Check for game over
    for (const auto& pos : active) {
        if (board[pos[0]][pos[1]]) {
            return false;
        }
    }
    return true;
}
std::pair<std::vector<std::vector<int>>, int> rotPiece(
    const std::vector<std::vector<bool>>& board,
    int shape,
    int rot,
    std::vector<std::vector<int>> act) {
    
    // Check if the piece is out of bounds or overlapping
    bool broken = false;
    for (const auto& el : act) {
        if (el[0] < 0 || el[0] > 19 || 
            el[1] < 0 || el[1] > 9 || 
            board[el[0]][el[1]]) {
            broken = true;
            break;
        }
    }
    
    if (broken) {
        return {act, rot};
    }
    
    // Rotation logic for different piece shapes
    switch (shape) {
        case 0: {  // I-piece
            if (rot == 0) {
                if (act[1][0] > 0 && act[1][0] + 2 < 20 &&
                    !board[act[1][0] - 1][act[1][1]] &&
                    !board[act[1][0] + 1][act[1][1]] &&
                    !board[act[1][0] + 2][act[1][1]]) {
                    act[0][0] -= 1; act[0][1] += 1;
                    act[2][0] += 1; act[2][1] -= 1;
                    act[3][0] += 2; act[3][1] -= 2;
                    rot = 1;
                }
            }
            else if (rot == 1) {
                if (act[1][1] - 1 > 0 && act[1][1] + 1 < 10 &&
                    !board[act[1][0]][act[1][1] + 1] &&
                    !board[act[1][0]][act[1][1] - 1] &&
                    !board[act[1][0]][act[1][1] - 2]) {
                    act[0][0] += 1; act[0][1] += 1;
                    act[2][0] -= 1; act[2][1] -= 1;
                    act[3][0] -= 2; act[3][1] -= 2;
                    rot = 2;
                }
            }
            else if (rot == 2) {
                if (act[1][0] - 1 > 0 && act[1][0] + 2 < 20 &&
                    !board[act[1][0] - 1][act[1][1]] &&
                    !board[act[1][0] + 1][act[1][1]] &&
                    !board[act[1][0] - 2][act[1][1]]) {
                    act[0][0] += 1; act[0][1] -= 1;
                    act[2][0] -= 1; act[2][1] += 1;
                    act[3][0] -= 2; act[3][1] += 2;
                    rot = 3;
                }
            }
            else if (rot == 3) {
                if (act[1][1] > 0 && act[1][1] + 1 < 9 &&
                    !board[act[1][0]][act[1][1] + 1] &&
                    !board[act[1][0]][act[1][1] - 1] &&
                    !board[act[1][0]][act[1][1] + 2]) {
                    act[0][0] -= 1; act[0][1] -= 1;
                    act[2][0] += 1; act[2][1] += 1;
                    act[3][0] += 2; act[3][1] += 2;
                    rot = 0;
                }
            }
            break;
        }
        case 1: {  // L-piece (right)
            if (rot == 0) {
                if (act[2][0] < 19 &&
                    !board[act[2][0] - 1][act[2][1] + 1] &&
                    !board[act[2][0] - 1][act[2][1]] &&
                    !board[act[2][0] + 1][act[2][1]]) {
                    act[0][1] += 2;
                    act[1][0] -= 1; act[1][1] += 1;
                    act[3][0] += 1; act[3][1] -= 1;
                    rot = 1;
                }
            }
            else if (rot == 1) {
                if (act[2][1] > 0 &&
                    !board[act[2][0] + 1][act[2][1] + 1] &&
                    !board[act[2][0]][act[2][1] + 1] &&
                    !board[act[2][0]][act[2][1] - 1]) {
                    act[0][0] += 2;
                    act[1][0] += 1; act[1][1] += 1;
                    act[3][0] -= 1; act[3][1] -= 1;
                    rot = 2;
                }
            }
            else if (rot == 2) {
                if (act[2][0] > 0 &&
                    !board[act[2][0] + 1][act[2][1] - 1] &&
                    !board[act[2][0] + 1][act[2][1]] &&
                    !board[act[2][0] - 1][act[2][1]]) {
                    act[0][1] -= 2;
                    act[1][0] += 1; act[1][1] -= 1;
                    act[3][0] -= 1; act[3][1] += 1;
                    rot = 3;
                }
            }
            else if (rot == 3) {
                if (act[2][1] < 9 &&
                    !board[act[2][0] - 1][act[2][1] - 1] &&
                    !board[act[2][0]][act[2][1] - 1] &&
                    !board[act[2][0]][act[2][1] + 1]) {
                    act[0][0] -= 2;
                    act[1][0] -= 1; act[1][1] -= 1;
                    act[3][0] += 1; act[3][1] += 1;
                    rot = 0;
                }
            }
            break;
        }
        case 2: {  // L-piece (left)
            if (rot == 0) {
                if (act[2][0] < 19 &&
                    !board[act[2][0] - 1][act[2][1] - 1] &&
                    !board[act[2][0] - 1][act[2][1]] &&
                    !board[act[2][0] + 1][act[2][1]]) {
                    act[0][0] += 2;
                    act[1][0] += 1; act[1][1] -= 1;
                    act[3][0] -= 1; act[3][1] += 1;
                    rot = 1;
                }
            }
            else if (rot == 1) {
                if (act[2][1] > 0 &&
                    !board[act[2][0] + 1][act[2][1] - 1] &&
                    !board[act[2][0]][act[2][1] - 1] &&
                    !board[act[2][0]][act[2][1] + 1]) {
                    act[0][1] -= 2;
                    act[1][0] -= 1; act[1][1] -= 1;
                    act[3][0] += 1; act[3][1] += 1;
                    rot = 2;
                }
            }
            else if (rot == 2) {
                if (act[2][0] > 0 &&
                    !board[act[2][0] - 1][act[2][1] + 1] &&
                    !board[act[2][0] - 1][act[2][1]] &&
                    !board[act[2][0] + 1][act[2][1]]) {
                    act[0][0] -= 2;
                    act[1][0] -= 1; act[1][1] += 1;
                    act[3][0] += 1; act[3][1] -= 1;
                    rot = 3;
                }
            }
            else if (rot == 3) {
                if (act[2][1] < 9 &&
                    !board[act[2][0] + 1][act[2][1] + 1] &&
                    !board[act[2][0]][act[2][1] + 1] &&
                    !board[act[2][0]][act[2][1] - 1]) {
                    act[0][1] += 2;
                    act[1][0] += 1; act[1][1] += 1;
                    act[3][0] -= 1; act[3][1] -= 1;
                    rot = 0;
                }
            }
            break;
        }
        case 3: {  // Square piece
            // No rotation for square piece
            break;
        }
        case 4: {  // S-piece
            if (rot == 0) {
                if (act[2][0] < 19 &&
                    !board[act[2][0] - 1][act[2][1] + 1] &&
                    !board[act[2][0] - 1][act[2][1]] &&
                    !board[act[2][0]][act[2][1] - 1]) {
                    act[0][0] += 1; act[0][1] += 1;
                    act[1][0] += 2;
                    act[3][0] -= 1; act[3][1] += 1;
                    rot = 1;
                }
            }
            else if (rot == 1) {
                if (act[2][1] > 0 &&
                    !board[act[2][0] + 1][act[2][1] - 1] &&
                    !board[act[2][0]][act[2][1] - 1] &&
                    !board[act[2][0] - 1][act[2][1]]) {
                    act[0][0] += 1; act[0][1] -= 1;
                    act[1][1] -= 2;
                    act[3][0] += 1; act[3][1] += 1;
                    rot = 2;
                }
            }
            else if (rot == 2) {
                if (act[2][0] > 0 &&
                    !board[act[2][0] + 1][act[2][1] - 1] &&
                    !board[act[2][0] + 1][act[2][1]] &&
                    !board[act[2][0]][act[2][1] + 1]) {
                    act[0][0] -= 1; act[0][1] -= 1;
                    act[1][0] -= 2;
                    act[3][0] += 1; act[3][1] -= 1;
                    rot = 3;
                }
            }
            else if (rot == 3) {
                if (act[2][1] < 9 &&
                    !board[act[2][0] - 1][act[2][1] + 1] &&
                    !board[act[2][0]][act[2][1] + 1] &&
                    !board[act[2][0] + 1][act[2][1]]) {
                    act[0][0] -= 1; act[0][1] += 1;
                    act[1][1] += 2;
                    act[3][0] -= 1; act[3][1] -= 1;
                    rot = 0;
                }
            }
            break;
        }
        case 5: {  // T-piece
            if (rot == 0) {
                if (act[2][0] < 19 &&
                    !board[act[2][0] - 1][act[2][1] + 1] &&
                    !board[act[2][0] - 1][act[2][1]] &&
                    !board[act[2][0] + 1][act[2][1]]) {
                    act[0][1] += 2;
                    act[1][0] += 1; act[1][1] += 1;
                    act[3][0] += 1; act[3][1] -= 1;
                    rot = 1;
                }
            }
            else if (rot == 1) {
                if (act[2][1] > 0 &&
                    !board[act[2][0] + 1][act[2][1] + 1] &&
                    !board[act[2][0]][act[2][1] + 1] &&
                    !board[act[2][0]][act[2][1] - 1]) {
                    act[0][0] += 2;
                    act[1][0] += 1; act[1][1] -= 1;
                    act[3][0] -= 1; act[3][1] -= 1;
                    rot = 2;
                }
            }
            else if (rot == 2) {
                if (act[2][0] > 0 &&
                    !board[act[2][0] + 1][act[2][1] - 1] &&
                    !board[act[2][0] + 1][act[2][1]] &&
                    !board[act[2][0] - 1][act[2][1]]) {
                    act[0][1] -= 2;
                    act[1][0] -= 1; act[1][1] -= 1;
                    act[3][0] -= 1; act[3][1] += 1;
                    rot = 3;
                }
            }
            else if (rot == 3) {
                if (act[2][1] < 9 &&
                    !board[act[2][0] - 1][act[2][1] - 1] &&
                    !board[act[2][0]][act[2][1] - 1] &&
                    !board[act[2][0]][act[2][1] + 1]) {
                    act[0][0] -= 2;
                    act[1][0] -= 1; act[1][1] += 1;
                    act[3][0] += 1; act[3][1] += 1;
                    rot = 0;
                }
            }
            break;
        }
        case 6: {  // Z-piece
            if (rot == 0) {
                if (act[2][0] < 19 &&
                    !board[act[2][0] - 1][act[2][1] - 1] &&
                    !board[act[2][0] - 1][act[2][1]] &&
                    !board[act[2][0] + 1][act[2][1]]) {
                    act[0][0] += 1; act[0][1] += 1;
                    act[1][0] -= 1; act[1][1] += 1;
                    act[3][0] += 1; act[3][1] -= 1;
                    rot = 1;
                }
            }
            else if (rot == 1) {
                if (act[2][1] > 0 &&
                    !board[act[2][0] + 1][act[2][1] + 1] &&
                    !board[act[2][0]][act[2][1] + 1] &&
                    !board[act[2][0]][act[2][1] - 1]) {
                    act[0][0] += 1; act[0][1] -= 1;
                    act[1][0] += 1; act[1][1] += 1;
                    act[3][0] -= 1; act[3][1] -= 1;
                    rot = 2;
                }
            }
            else if (rot == 2) {
                if (act[2][0] > 0 &&
                    !board[act[2][0] + 1][act[2][1] + 1] &&
                    !board[act[2][0] + 1][act[2][1]] &&
                    !board[act[2][0] - 1][act[2][1]]) {
                    act[0][0] -= 1; act[0][1] -= 1;
                    act[1][0] += 1; act[1][1] -= 1;
                    act[3][0] -= 1; act[3][1] += 1;
                    rot = 3;
                }
            }
            else if (rot == 3) {
                if (act[2][1] < 9 &&
                    !board[act[2][0] - 1][act[2][1] - 1] &&
                    !board[act[2][0]][act[2][1] - 1] &&
                    !board[act[2][0]][act[2][1] + 1]) {
                    act[0][0] -= 1; act[0][1] += 1;
                    act[1][0] -= 1; act[1][1] -= 1;
                    act[3][0] += 1; act[3][1] += 1;
                    rot = 0;
                }
            }
            break;
        }
    }
    return {act, rot};
}

struct Weights {
    static constexpr double CLEARED_LINES = 3.0;   // Reward for clearing lines
    static constexpr double HEIGHT = -0.51;        // Penalty for high board
    static constexpr double HOLES = -0.36;         // Penalty for holes
    static constexpr double BUMPINESS = -0.18;     // Penalty for uneven surface
    static constexpr double WELLS = -0.24;         // Penalty for deep wells
    static constexpr double BLOCKADES = -0.3;      // Penalty for blocks above holes
};

double analyze(const std::vector<std::vector<bool>>& board) {
    // Calculate cleared lines
    int cleared_lines = 0;
    for (const auto& row : board) {
        bool all_filled = true;
        for (bool cell : row) {
            if (!cell) {
                all_filled = false;
                break;
            }
        }
        if (all_filled) {
            cleared_lines++;
        }
    }

    // Calculate column heights
    std::vector<int> column_heights(10, 0);
    for (int j = 0; j < 10; j++) {
        for (int i = 0; i < 20; i++) {
            if (board[i][j]) {
                column_heights[j] = 20 - i;
                break;
            }
        }
    }

    // Calculate maximum height
    int max_height = *std::max_element(column_heights.begin(), column_heights.end());

    // Calculate holes and blockades
    int holes = 0;
    int blockades = 0;
    for (int j = 0; j < 10; j++) {
        bool found_top = false;
        int hole_count = 0;
        int blockade_count = 0;

        for (int i = 0; i < 20; i++) {
            if (board[i][j]) {
                found_top = true;
                blockade_count += hole_count;  // Blocks above holes
            }
            else if (found_top) {
                hole_count++;
            }
        }

        holes += hole_count;
        blockades += blockade_count;
    }

    // Calculate bumpiness (difference between adjacent columns)
    int bumpiness = 0;
    for (int j = 0; j < 9; j++) {
        bumpiness += std::abs(column_heights[j] - column_heights[j + 1]);
    }

    // Calculate wells (deep gaps between higher columns)
    int wells = 0;
    for (int j = 0; j < 10; j++) {
        int left_height = (j > 0) ? column_heights[j - 1] : column_heights[j];
        int right_height = (j < 9) ? column_heights[j + 1] : column_heights[j];
        int current_height = column_heights[j];

        if (current_height < left_height && current_height < right_height) {
            wells += std::min(left_height, right_height) - current_height;
        }
    }

    // Calculate final score
    double score = 
        Weights::CLEARED_LINES * std::pow(2.0, cleared_lines) +
        Weights::HEIGHT * max_height +
        Weights::HOLES * holes +
        Weights::BUMPINESS * bumpiness +
        Weights::WELLS * wells +
        Weights::BLOCKADES * blockades;
    // std::cout<<score<<std::endl;
    return score;
}
struct Score {
    double score;
    std::vector<std::vector<int>> active;
    int rotation;
    
    Score(double s, const std::vector<std::vector<int>>& a, int r) 
        : score(s), active(a), rotation(r) {}
};



// Implementation of utility functions
std::vector<std::vector<int>> deepcopy(const std::vector<std::vector<int>>& vec) {
    return std::vector<std::vector<int>>(vec);
}

// Analyze board state - this is a placeholder implementation
// You should replace this with your actual analysis logic




// Main automation function
std::pair<double, std::vector<std::vector<int>>> automate(
    std::vector<std::vector<bool>>& board,
    std::vector<std::vector<int>>& active,
    int shape,
    int rot
) {
    auto tempBoard = board;
    auto tempActive = active;
    int tempRot = rot;
    int tempShape = shape;
    std::vector<Score> scores;

    for (int rotationCount = 0; rotationCount < 4; rotationCount++) {
        // Move piece down until it hits bottom or another piece
        while (
            tempActive[0][1] != 0 &&
            tempActive[1][1] != 0 &&
            tempActive[2][1] != 0 &&
            tempActive[3][1] != 0 &&
            !board[tempActive[0][0]][tempActive[0][1]-1] &&
            !board[tempActive[1][0]][tempActive[1][1]-1] &&
            !board[tempActive[2][0]][tempActive[2][1]-1] &&
            !board[tempActive[3][0]][tempActive[3][1]-1]
        ) {
            for (auto& piece : tempActive) {
                piece[1]--;
            }
        }

        auto tempActive1 = deepcopy(tempActive);
        auto bact = deepcopy(tempActive);

        // Try all possible horizontal positions
        while (
            tempActive1[0][1] < 10 &&
            tempActive1[1][1] < 10 &&
            tempActive1[2][1] < 10 &&
            tempActive1[3][1] < 10 &&
            (!(
                tempActive1[0][1] < 9 &&
                tempActive1[1][1] < 9 &&
                tempActive1[2][1] < 9 &&
                tempActive1[3][1] < 9
            ) || (!board[tempActive1[0][0]][tempActive1[0][1]+1] &&
                !board[tempActive1[1][0]][tempActive1[1][1]+1] &&
                !board[tempActive1[2][0]][tempActive1[2][1]+1] &&
                !board[tempActive1[3][0]][tempActive1[3][1]+1]))
        ) {
            auto temp = deepcopy(tempActive1);
            auto tempB = tempBoard;

            // Drop piece to bottom
            while (
                temp[0][0] < 19 &&
                temp[1][0] < 19 &&
                temp[2][0] < 19 &&
                temp[3][0] < 19 &&
                !tempB[temp[0][0]+1][temp[0][1]] &&
                !tempB[temp[1][0]+1][temp[1][1]] &&
                !tempB[temp[2][0]+1][temp[2][1]] &&
                !tempB[temp[3][0]+1][temp[3][1]]
            ) {
                for (auto& piece : temp) {
                    piece[0]++;
                }
            }

            // Place piece on board
            for (const auto& piece : temp) {
                tempB[piece[0]][piece[1]] = true;
            }

            scores.emplace_back(analyze(tempB), deepcopy(tempActive1), tempRot);

            // Move piece right
            for (auto& piece : tempActive1) {
                piece[1]++;
            }
        }

        tempActive = deepcopy(bact);
        int prev_rot = tempRot;

        // Try all possible rotations
        for (int i = 0; i < 5; i++) {
            if (prev_rot == tempRot) {
                tempActive = deepcopy(bact);
                
                if (shape == 0) { // I-piece
                    auto applyOffset = [&](const std::vector<std::pair<int, int>>& offsets) {
                        auto newActive = tempActive;
                        for (size_t j = 0; j < newActive.size(); j++) {
                            newActive[j][0] += offsets[j].first;
                            newActive[j][1] += offsets[j].second;
                        }
                        return rotPiece(board, shape, tempRot, newActive);
                    };

                    switch (i) {
                        case 0: {
                            std::tie(tempActive, tempRot) = rotPiece(board, shape, tempRot, tempActive);
                            break;
                        }
                        case 1: {
                            std::vector<std::pair<int, int>> offsets;
                            if (tempRot == 0) offsets = {{0, -2}, {0, -2}, {0, -2}, {0, -2}};
                            else if (tempRot == 1) offsets = {{0, -1}, {0, -1}, {0, -1}, {0, -1}};
                            else if (tempRot == 2) offsets = {{0, 2}, {0, 2}, {0, 2}, {0, 2}};
                            else offsets = {{0, 1}, {0, 1}, {0, 1}, {0, 1}};
                            std::tie(tempActive, tempRot) = applyOffset(offsets);
                            break;
                        }
                        case 2: {
                            std::vector<std::pair<int, int>> offsets;
                            if (tempRot == 3) offsets = {{0, -2}, {0, -2}, {0, -2}, {0, -2}};
                            else if (tempRot == 2) offsets = {{0, -1}, {0, -1}, {0, -1}, {0, -1}};
                            else if (tempRot == 1) offsets = {{0, 2}, {0, 2}, {0, 2}, {0, 2}};
                            else offsets = {{0, 1}, {0, 1}, {0, 1}, {0, 1}};
                            std::tie(tempActive, tempRot) = applyOffset(offsets);
                            break;
                        }
                        case 3: {
                            std::vector<std::pair<int, int>> offsets;
                            if (tempRot == 0) offsets = {{-1, -2}, {-1, -2}, {-1, -2}, {-1, -2}};
                            else if (tempRot == 1) offsets = {{2, -1}, {2, -1}, {2, -1}, {2, -1}};
                            else if (tempRot == 2) offsets = {{1, 2}, {1, 2}, {1, 2}, {1, 2}};
                            else offsets = {{-2, 1}, {-2, 1}, {-2, 1}, {-2, 1}};
                            std::tie(tempActive, tempRot) = applyOffset(offsets);
                            break;
                        }
                        case 4: {
                            std::vector<std::pair<int, int>> offsets;
                            if (tempRot == 0) offsets = {{2, 1}, {2, 1}, {2, 1}, {2, 1}};
                            else if (tempRot == 1) offsets = {{-1, 2}, {-1, 2}, {-1, 2}, {-1, 2}};
                            else if (tempRot == 2) offsets = {{-2, -1}, {-2, -1}, {-2, -1}, {-2, -1}};
                            else offsets = {{1, -2}, {1, -2}, {1, -2}, {1, -2}};
                            std::tie(tempActive, tempRot) = applyOffset(offsets);
                            break;
                        }
                    }
                } else { // Other pieces
                    auto applyOffset = [&](const std::vector<std::pair<int, int>>& offsets) {
                        auto newActive = tempActive;
                        for (size_t j = 0; j < newActive.size(); j++) {
                            newActive[j][0] += offsets[j].first;
                            newActive[j][1] += offsets[j].second;
                        }
                        return rotPiece(board, shape, tempRot, newActive);
                    };

                    switch (i) {
                        case 0: {
                            std::tie(tempActive, tempRot) = rotPiece(board, shape, tempRot, tempActive);
                            break;
                        }
                        case 1: {
                            std::vector<std::pair<int, int>> offsets(4);
                            for (auto& offset : offsets) {
                                offset = {0, (tempRot == 0 || tempRot == 3) ? -1 : 1};
                            }
                            std::tie(tempActive, tempRot) = applyOffset(offsets);
                            break;
                        }
                        case 2: {
                            std::vector<std::pair<int, int>> offsets;
                            if (tempRot == 0) offsets = {{1, -1}, {1, -1}, {1, -1}, {1, -1}};
                            else if (tempRot == 1) offsets = {{-1, 1}, {-1, 1}, {-1, 1}, {-1, 1}};
                            else if (tempRot == 2) offsets = {{1, 1}, {1, 1}, {1, 1}, {1, 1}};
                            else offsets = {{-1, -1}, {-1, -1}, {-1, -1}, {-1, -1}};
                            std::tie(tempActive, tempRot) = applyOffset(offsets);
                            break;
                        }
                        case 3: {
                            std::vector<std::pair<int, int>> offsets(4);
                            for (auto& offset : offsets) {
                                offset = {(tempRot == 0 || tempRot == 2) ? -2 : 2, 0};
                            }
                            std::tie(tempActive, tempRot) = applyOffset(offsets);
                            break;
                        }
                        case 4: {
                            std::vector<std::pair<int, int>> offsets;
                            if (tempRot == 0) offsets = {{-2, -1}, {-2, -1}, {-2, -1}, {-2, -1}};
                            else if (tempRot == 1) offsets = {{2, 1}, {2, 1}, {2, 1}, {2, 1}};
                            else if (tempRot == 2) offsets = {{-2, 1}, {-2, 1}, {-2, 1}, {-2, 1}};
                            else offsets = {{2, -1}, {2, -1}, {2, -1}, {2, -1}};
                            std::tie(tempActive, tempRot) = applyOffset(offsets);
                            break;
                        }
                    }
                }
            }
        }

        if (prev_rot == tempRot) {
            tempActive = deepcopy(bact);
        }
    }

    // Find best score
    if (scores.empty()) {
        return {0, active};
    }

    auto maxScore = std::max_element(scores.begin(), scores.end(),
        [](const Score& a, const Score& b) { return a.score < b.score; });
    for (const auto& piece : maxScore->active) {
        std::cout << piece[0] << " " << piece[1] << std::endl;
    }
    std::cout << "\n\n\n" << std::endl;
    return {maxScore->score, maxScore->active};
}
// Initialize game state
void initGame() {
    // Initialize random
    hold = getRandomAndRemove(bag);
    shape = getRandomAndRemove(bag);
    next = getRandomAndRemove(bag);
    
    // Initialize active piece
    active = activePos[shape];
}
int main() {
    // Initialize start time
    initGame();
    auto startTime = std::chrono::steady_clock::now();
    
    bool move = false;
    
    while (true) {
        if (!move) {
            // Get score and position from automation
            auto [scr, newActive] = automate(board, active, shape, rot);
            
            // Check held piece
            auto tempActive = deepcopy(activePos[hold]);
            auto [scr2, active2] = automate(board, tempActive, hold, 0);
            
            if (scr2 > scr) {
                active = active2;
                int temp = shape;
                shape = hold;
                rot = 0;
                hold = temp;
            }
            
            move = true;
        }
        
        if (move) {
            move = false;
            
            // Move piece down until it hits something
            while (
                active[0][0] < 19 &&
                active[1][0] < 19 &&
                active[2][0] < 19 &&
                active[3][0] < 19 &&
                !board[active[0][0]+1][active[0][1]] &&
                !board[active[1][0]+1][active[1][1]] &&
                !board[active[2][0]+1][active[2][1]] &&
                !board[active[3][0]+1][active[3][1]]
            ) {
                for (auto& piece : active) {
                    piece[0] += 1;
                }
            }
            
            if (!createNewPiece()) {
                break;
            }
        }
    }
    
    // Calculate elapsed time
    auto endTime = std::chrono::steady_clock::now();
    auto duration = std::chrono::duration_cast<std::chrono::seconds>(endTime - startTime).count();
    
    // Print final score and time
    std::cout << "Score: " << score << std::endl;
    std::cout << "Time: " << duration << std::endl;
    
    return 0;
}
