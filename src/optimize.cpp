#include <iostream>
#include <vector>
#include <random>
#include <algorithm>
#include <limits>
#include <iomanip>
#include <cmath>
#include <numeric>
#include "tetris.h"
// Struct to replace WeightSet dataclass


// Random number generator setup
std::random_device rd;
std::mt19937 gen(rd());
std::uniform_real_distribution<> dist(-0.5, 0.5);
std::uniform_real_distribution<> mutation_dist(-0.25, 0.25);

// Function to create initial population
std::vector<WeightSet> create_initial_population(const WeightSet& base_weights, int population_size) {
    std::vector<WeightSet> population;
    for (int i = 0; i < population_size; ++i) {
        WeightSet new_weights = {
            base_weights.weightedBlocks * (1 + dist(gen)),
            base_weights.connectedHoles * (1 + dist(gen)),
            base_weights.roughness * (1 + dist(gen)),
            base_weights.pitholePercentage * (1 + dist(gen)),
            base_weights.clearAbleLines * (1 + dist(gen)),
            base_weights.deepestHole * (1 + dist(gen)),
            base_weights.blocks * (1 + dist(gen)),
            base_weights.colHoles * (1 + dist(gen))
        };
        population.push_back(new_weights);
    }
    return population;
}

// Placeholder for Tetris game simulation
// int play_tetris_game(const WeightSet& weights) {
//     return activateSimulation(weights);  
// }

// Evaluate fitness of a weight set
float evaluate_fitness(const WeightSet& weights, int num_games = 3) {
    float total_score = 0.0f;
    float total_time = 0.0f;
    
    for (int i = 0; i < num_games; ++i) {
        int score = activateSimulation(weights);
        total_score += score;
        total_time += 1;
    }
    
    return total_time > 0 ? total_score / total_time : 0.0f;
}

// Tournament selection of parents
std::vector<WeightSet> select_parents(
    const std::vector<WeightSet>& population, 
    const std::vector<float>& fitness_scores
) {
    std::vector<WeightSet> parents;
    std::uniform_int_distribution<> index_dist(0, population.size() - 1);
    
    for (size_t i = 0; i < population.size(); ++i) {
        std::vector<size_t> tournament_indices;
        for (int j = 0; j < 5; ++j) {
            tournament_indices.push_back(index_dist(gen));
        }
        
        size_t winner_idx = *std::max_element(
            tournament_indices.begin(), 
            tournament_indices.end(), 
            [&fitness_scores](size_t a, size_t b) {
                return fitness_scores[a] < fitness_scores[b];
            }
        );
        
        parents.push_back(population[winner_idx]);
    }
    
    return parents;
}

// Crossover between two parents
WeightSet crossover(const WeightSet& parent1, const WeightSet& parent2) {
    std::uniform_int_distribution<> coin_flip(0, 1);
    return {
        coin_flip(gen) ? parent1.weightedBlocks : parent2.weightedBlocks,
        coin_flip(gen) ? parent1.connectedHoles : parent2.connectedHoles,
        coin_flip(gen) ? parent1.roughness : parent2.roughness,
        coin_flip(gen) ? parent1.pitholePercentage : parent2.pitholePercentage,
        coin_flip(gen) ? parent1.clearAbleLines : parent2.clearAbleLines,
        coin_flip(gen) ? parent1.deepestHole : parent2.deepestHole,
        coin_flip(gen) ? parent1.blocks : parent2.blocks,
        coin_flip(gen) ? parent1.colHoles : parent2.colHoles
    };
}

WeightSet mutate(const WeightSet& weights, float mutation_rate) {
    WeightSet mutated = weights;
    std::uniform_real_distribution<> prob_dist(0.0, 1.0);
    
    if (prob_dist(gen) < mutation_rate) 
        mutated.weightedBlocks *= (1 + mutation_dist(gen));
    if (prob_dist(gen) < mutation_rate) 
        mutated.connectedHoles *= (1 + mutation_dist(gen));
    if (prob_dist(gen) < mutation_rate) 
        mutated.roughness *= (1 + mutation_dist(gen));
    if (prob_dist(gen) < mutation_rate) 
        mutated.pitholePercentage *= (1 + mutation_dist(gen));
    if (prob_dist(gen) < mutation_rate) 
        mutated.clearAbleLines *= (1 + mutation_dist(gen));
    if (prob_dist(gen) < mutation_rate) 
        mutated.deepestHole *= (1 + mutation_dist(gen));
    if (prob_dist(gen) < mutation_rate) 
        mutated.blocks *= (1 + mutation_dist(gen));
    if (prob_dist(gen) < mutation_rate) 
        mutated.colHoles *= (1 + mutation_dist(gen));
    
    return mutated;
}

// Main optimization function
WeightSet optimize_weights(
    const WeightSet& base_weights, 
    int population_size = 32, 
    float mutation_rate = 0.1, 
    int generations = 32
) {
    std::vector<WeightSet> population = create_initial_population(base_weights, population_size);
    WeightSet best_weights = base_weights;
    float best_score = std::numeric_limits<float>::lowest();
    
    for (int generation = 0; generation < generations; ++generation) {
        std::vector<float> fitness_scores;
        
        for (const auto& weights : population) {
            float fitness = evaluate_fitness(weights);
            fitness_scores.push_back(fitness);
            
            if (fitness > best_score) {
                best_score = fitness;
                best_weights = weights;
                
                std::cout << "New best score: " << std::fixed << std::setprecision(2) << best_score << std::endl;
std::cout << "Weights: " << std::endl;
std::cout << "  Weighted Blocks: " << best_weights.weightedBlocks << std::endl;
std::cout << "  Connected Holes: " << best_weights.connectedHoles << std::endl;
std::cout << "  Roughness: " << best_weights.roughness << std::endl;
std::cout << "  Pithole Percentage: " << best_weights.pitholePercentage << std::endl;
std::cout << "  Clearable Lines: " << best_weights.clearAbleLines << std::endl;
std::cout << "  Deepest Hole: " << best_weights.deepestHole << std::endl;
std::cout << "  Blocks: " << best_weights.blocks << std::endl;
std::cout << "  Column Holes: " << best_weights.colHoles << std::endl;
            }
        }
        
        std::vector<WeightSet> parents = select_parents(population, fitness_scores);
        
        std::vector<WeightSet> new_population;
        while (new_population.size() < population_size) {
            size_t idx1 = std::uniform_int_distribution<>(0, parents.size() - 1)(gen);
            size_t idx2 = std::uniform_int_distribution<>(0, parents.size() - 1)(gen);
            WeightSet child = crossover(parents[idx1], parents[idx2]);
            child = mutate(child, mutation_rate);
            new_population.push_back(child);
        }
        
        population = new_population;
        
        float avg_fitness = std::accumulate(fitness_scores.begin(), fitness_scores.end(), 0.0f) / fitness_scores.size();
        float max_fitness = *std::max_element(fitness_scores.begin(), fitness_scores.end());
        
        std::cout << "Generation " << generation + 1 << "/" << generations 
                  << ", Avg Fitness: " << std::fixed << std::setprecision(2) << avg_fitness 
                  << ", Best Fitness: " << max_fitness << std::endl;
    }
    
    return best_weights;
}

int main() {
    WeightSet base_weights = {
    0.5,    // weightedBlocks (slightly higher, rewards block placement strategy)
    0.2,    // connectedHoles (moderate, penalizes complex hole formations)
    -0.4,   // roughness (moderate negative, discourages uneven surfaces)
    0.3,    // pitholePercentage (higher, encourages minimizing pits)
    0.6,    // clearAbleLines (significant, rewards potential line clears)
    0.3,    // deepestHole (moderate, penalizes deep structural weaknesses)
    -0.3,   // blocks (moderate negative, discourages excess blocks)
    -0.6    // colHoles (stronger negative, heavily penalizes column holes)
};
    
    WeightSet best_weights = optimize_weights(base_weights);
    
    std::cout << "\nFinal optimized weights:" << std::endl;
std::cout << "  Weighted Blocks: " << best_weights.weightedBlocks << std::endl;
std::cout << "  Connected Holes: " << best_weights.connectedHoles << std::endl;
std::cout << "  Roughness: " << best_weights.roughness << std::endl;
std::cout << "  Pithole Percentage: " << best_weights.pitholePercentage << std::endl;
std::cout << "  Clearable Lines: " << best_weights.clearAbleLines << std::endl;
std::cout << "  Deepest Hole: " << best_weights.deepestHole << std::endl;
std::cout << "  Blocks: " << best_weights.blocks << std::endl;
std::cout << "  Column Holes: " << best_weights.colHoles << std::endl;
    
    return 0;
}