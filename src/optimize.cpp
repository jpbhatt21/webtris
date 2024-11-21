#include <iostream>
#include <vector>
#include <random>
#include <algorithm>
#include <limits>
#include <iomanip>
#include <cmath>
#include <numeric>
#include "tetris.h"
using namespace std;
random_device rd;
mt19937 gen(rd());
uniform_real_distribution<> dist(-0.5, 0.5);
uniform_real_distribution<> mutation_dist(-0.25, 0.25);
// Function to create initial population
vector<WeightSet> create_initial_population(const WeightSet &base_weights, int population_size)
{
    vector<WeightSet> population;
    for (int i = 0; i < population_size; ++i)
    {
        WeightSet new_weights = {
            base_weights.weightedBlocks * (1 + dist(gen)),
            base_weights.connectedHoles * (1 + dist(gen)),
            base_weights.roughness * (1 + dist(gen)),
            base_weights.pitholePercentage * (1 + dist(gen)),
            base_weights.clearAbleLines * (1 + dist(gen)),
            base_weights.deepestHole * (1 + dist(gen)),
            base_weights.blocks * (1 + dist(gen)),
            base_weights.colHoles * (1 + dist(gen))};
        population.push_back(new_weights);
    }
    return population;
}
// Evaluate fitness of a weight set
float evaluate_fitness(const WeightSet &weights, int num_games = 3)
{
    float total_score = 0.0f;
    float total_time = 0.0f;
    for (int i = 0; i < num_games; ++i)
    {
        int score = activateSimulation(weights);
        total_score += score;
        total_time += 1;
    }
    return total_time > 0 ? total_score / total_time : 0.0f;
}

// Tournament selection of parents
vector<WeightSet> select_parents(const vector<WeightSet> &population, const vector<float> &fitness_scores)
{
    vector<WeightSet> parents;
    uniform_int_distribution<> index_dist(0, population.size() - 1);
    for (size_t i = 0; i < population.size(); ++i)
    {
        vector<size_t> tournament_indices;
        for (int j = 0; j < 5; ++j)
        {
            tournament_indices.push_back(index_dist(gen));
        }
        size_t winner_idx = *max_element(
            tournament_indices.begin(),
            tournament_indices.end(),
            [&fitness_scores](size_t a, size_t b)
            {
                return fitness_scores[a] < fitness_scores[b];
            });
        parents.push_back(population[winner_idx]);
    }

    return parents;
}

// Crossover between two parents
WeightSet crossover(const WeightSet &parent1, const WeightSet &parent2)
{
    uniform_int_distribution<> coin_flip(0, 1);
    return {
        coin_flip(gen) ? parent1.weightedBlocks : parent2.weightedBlocks,
        coin_flip(gen) ? parent1.connectedHoles : parent2.connectedHoles,
        coin_flip(gen) ? parent1.roughness : parent2.roughness,
        coin_flip(gen) ? parent1.pitholePercentage : parent2.pitholePercentage,
        coin_flip(gen) ? parent1.clearAbleLines : parent2.clearAbleLines,
        coin_flip(gen) ? parent1.deepestHole : parent2.deepestHole,
        coin_flip(gen) ? parent1.blocks : parent2.blocks,
        coin_flip(gen) ? parent1.colHoles : parent2.colHoles};
}

// Mutate a weight set
WeightSet mutate(const WeightSet &weights, float mutation_rate)
{
    WeightSet mutated = weights;
    uniform_real_distribution<> prob_dist(0.0, 1.0);
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
WeightSet optimize_weights(const WeightSet &base_weights, int population_size = 32, float mutation_rate = 0.1, int generations = 32)
{
    vector<WeightSet> population = create_initial_population(base_weights, population_size);
    WeightSet best_weights = base_weights;
    float best_score = numeric_limits<float>::lowest();
    for (int generation = 0; generation < generations; ++generation)
    {
        vector<float> fitness_scores;

        for (const auto &weights : population)
        {
            float fitness = evaluate_fitness(weights);
            fitness_scores.push_back(fitness);

            if (fitness > best_score)
            {
                best_score = fitness;
                best_weights = weights;
                cout << "New best score: " << fixed << setprecision(2) << best_score << endl;
                cout << "Weights: " << endl;
                cout << "  Weighted Blocks: " << best_weights.weightedBlocks << endl;
                cout << "  Connected Holes: " << best_weights.connectedHoles << endl;
                cout << "  Roughness: " << best_weights.roughness << endl;
                cout << "  Pithole Percentage: " << best_weights.pitholePercentage << endl;
                cout << "  Clearable Lines: " << best_weights.clearAbleLines << endl;
                cout << "  Deepest Hole: " << best_weights.deepestHole << endl;
                cout << "  Blocks: " << best_weights.blocks << endl;
                cout << "  Column Holes: " << best_weights.colHoles << endl;
            }
        }
        vector<WeightSet> parents = select_parents(population, fitness_scores);
        vector<WeightSet> new_population;
        while (new_population.size() < population_size)
        {
            size_t idx1 = uniform_int_distribution<>(0, parents.size() - 1)(gen);
            size_t idx2 = uniform_int_distribution<>(0, parents.size() - 1)(gen);
            WeightSet child = crossover(parents[idx1], parents[idx2]);
            child = mutate(child, mutation_rate);
            new_population.push_back(child);
        }
        population = new_population;
        float avg_fitness = accumulate(fitness_scores.begin(), fitness_scores.end(), 0.0f) / fitness_scores.size();
        float max_fitness = *max_element(fitness_scores.begin(), fitness_scores.end());
        cout << "Generation " << generation + 1 << "/" << generations
             << ", Avg Fitness: " << fixed << setprecision(2) << avg_fitness
             << ", Best Fitness: " << max_fitness << endl;
    }

    return best_weights;
}

int main()
{
    WeightSet base_weights = {
        0.5,  // weightedBlocks
        0.2,  // connectedHoles
        -0.4, // roughness
        0.3,  // pitholePercentage
        0.6,  // clearAbleLines
        0.3,  // deepestHole
        -0.3, // blocks
        -0.6  // colHoles
    };
    WeightSet best_weights = optimize_weights(base_weights);
    cout << "\nFinal optimized weights:" << endl;
    cout << "  Weighted Blocks: " << best_weights.weightedBlocks << endl;
    cout << "  Connected Holes: " << best_weights.connectedHoles << endl;
    cout << "  Roughness: " << best_weights.roughness << endl;
    cout << "  Pithole Percentage: " << best_weights.pitholePercentage << endl;
    cout << "  Clearable Lines: " << best_weights.clearAbleLines << endl;
    cout << "  Deepest Hole: " << best_weights.deepestHole << endl;
    cout << "  Blocks: " << best_weights.blocks << endl;
    cout << "  Column Holes: " << best_weights.colHoles << endl;
    return 0;
}