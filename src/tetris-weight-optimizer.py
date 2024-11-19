import numpy as np
from typing import Dict, List, Tuple
import random
import json
from dataclasses import dataclass
from copy import deepcopy

@dataclass
class WeightSet:
    CLEARED_LINES: float
    HEIGHT: float
    HOLES: float
    BUMPINESS: float
    WELLS: float
    BLOCKADES: float

    def to_dict(self) -> Dict[str, float]:
        return {
            'CLEARED_LINES': self.CLEARED_LINES,
            'HEIGHT': self.HEIGHT,
            'HOLES': self.HOLES,
            'BUMPINESS': self.BUMPINESS,
            'WELLS': self.WELLS,
            'BLOCKADES': self.BLOCKADES
        }

class TetrisWeightOptimizer:
    def __init__(self, population_size: int = 50, mutation_rate: float = 0.1):
        self.population_size = population_size
        self.mutation_rate = mutation_rate
        self.best_weights = None
        self.best_score = float('-inf')
        
        # Initial weights from your function
        self.base_weights = WeightSet(
            CLEARED_LINES=3.0,
            HEIGHT=-0.51,
            HOLES=-0.36,
            BUMPINESS=-0.18,
            WELLS=-0.24,
            BLOCKADES=-0.3
        )

    def create_initial_population(self) -> List[WeightSet]:
        """Create initial population with variations of the base weights"""
        population = []
        for _ in range(self.population_size):
            new_weights = WeightSet(
                CLEARED_LINES=self.base_weights.CLEARED_LINES * (1 + random.uniform(-0.2, 0.2)),
                HEIGHT=self.base_weights.HEIGHT * (1 + random.uniform(-0.2, 0.2)),
                HOLES=self.base_weights.HOLES * (1 + random.uniform(-0.2, 0.2)),
                BUMPINESS=self.base_weights.BUMPINESS * (1 + random.uniform(-0.2, 0.2)),
                WELLS=self.base_weights.WELLS * (1 + random.uniform(-0.2, 0.2)),
                BLOCKADES=self.base_weights.BLOCKADES * (1 + random.uniform(-0.2, 0.2))
            )
            population.append(new_weights)
        return population

    def evaluate_fitness(self, weights: WeightSet, num_games: int = 3) -> float:
        """
        Evaluate fitness by playing multiple games with the given weights
        and returning the average score per second
        """
        total_score = 0
        total_time = 0
        
        for _ in range(num_games):
            # This is where you would interface with your Tetris simulation
            # Using the weights provided in the WeightSet
            score, time_played = self.play_tetris_game(weights)
            total_score += score
            total_time += time_played
        
        # Return average score per second
        return total_score / total_time if total_time > 0 else 0

    def play_tetris_game(self, weights: WeightSet) -> Tuple[float, float]:
        """
        Interface with your Tetris game simulation.
        Returns (score, time_played)
        
        You need to implement this method to use your evaluation function
        with the provided weights to play a full game of Tetris
        """
        # TODO: Implement interface with your Tetris simulation
        # This should:
        # 1. Convert WeightSet to the format your game expects
        # 2. Play a full game using these weights
        # 3. Return the final score and time played
        pass

    def select_parents(self, population: List[WeightSet], 
                      fitness_scores: List[float]) -> List[WeightSet]:
        """Select parents for next generation using tournament selection"""
        parents = []
        for _ in range(len(population)):
            # Tournament selection
            tournament_size = 5
            tournament_indices = random.sample(range(len(population)), tournament_size)
            tournament_fitness = [fitness_scores[i] for i in tournament_indices]
            winner_idx = tournament_indices[np.argmax(tournament_fitness)]
            parents.append(deepcopy(population[winner_idx]))
        return parents

    def crossover(self, parent1: WeightSet, parent2: WeightSet) -> WeightSet:
        """Create a child by combining weights from both parents"""
        child = WeightSet(
            CLEARED_LINES=random.choice([parent1.CLEARED_LINES, parent2.CLEARED_LINES]),
            HEIGHT=random.choice([parent1.HEIGHT, parent2.HEIGHT]),
            HOLES=random.choice([parent1.HOLES, parent2.HOLES]),
            BUMPINESS=random.choice([parent1.BUMPINESS, parent2.BUMPINESS]),
            WELLS=random.choice([parent1.WELLS, parent2.WELLS]),
            BLOCKADES=random.choice([parent1.BLOCKADES, parent2.BLOCKADES])
        )
        return child

    def mutate(self, weights: WeightSet) -> WeightSet:
        """Randomly mutate weights"""
        mutated = deepcopy(weights)
        if random.random() < self.mutation_rate:
            mutated.CLEARED_LINES *= (1 + random.uniform(-0.1, 0.1))
        if random.random() < self.mutation_rate:
            mutated.HEIGHT *= (1 + random.uniform(-0.1, 0.1))
        if random.random() < self.mutation_rate:
            mutated.HOLES *= (1 + random.uniform(-0.1, 0.1))
        if random.random() < self.mutation_rate:
            mutated.BUMPINESS *= (1 + random.uniform(-0.1, 0.1))
        if random.random() < self.mutation_rate:
            mutated.WELLS *= (1 + random.uniform(-0.1, 0.1))
        if random.random() < self.mutation_rate:
            mutated.BLOCKADES *= (1 + random.uniform(-0.1, 0.1))
        return mutated

    def optimize(self, generations: int = 50) -> WeightSet:
        """Main optimization loop using genetic algorithm"""
        population = self.create_initial_population()
        
        for generation in range(generations):
            # Evaluate fitness for all weight sets
            fitness_scores = []
            for weights in population:
                fitness = self.evaluate_fitness(weights)
                fitness_scores.append(fitness)
                
                # Update best weights if new best found
                if fitness > self.best_score:
                    self.best_score = fitness
                    self.best_weights = deepcopy(weights)
                    print(f"New best score: {self.best_score:.2f}")
                    print("Weights:", json.dumps(self.best_weights.to_dict(), indent=2))
            
            # Select parents for next generation
            parents = self.select_parents(population, fitness_scores)
            
            # Create new population
            new_population = []
            while len(new_population) < self.population_size:
                parent1, parent2 = random.sample(parents, 2)
                child = self.crossover(parent1, parent2)
                child = self.mutate(child)
                new_population.append(child)
            
            population = new_population
            
            # Print generation summary
            avg_fitness = sum(fitness_scores) / len(fitness_scores)
            print(f"Generation {generation + 1}/{generations}, "
                  f"Avg Fitness: {avg_fitness:.2f}, "
                  f"Best Fitness: {max(fitness_scores):.2f}")
        
        return self.best_weights

# Example usage
def main():
    optimizer = TetrisWeightOptimizer(population_size=50)
    best_weights = optimizer.optimize(generations=50)
    print("\nFinal optimized weights:")
    print(json.dumps(best_weights.to_dict(), indent=2))

if __name__ == "__main__":
    main()
