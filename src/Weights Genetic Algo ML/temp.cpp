#include "tetris.h"
WeightSet weight= {
    0.3,    // weightedBlocks
    0.1,    // connectedHoles
    -0.5,   // roughness
    0.15,   // pitholePercentage
    0.5,    // clearAbleLines
    0.25,   // deepestHole
    -0.25,  // blocks
    -0.75   // colHoles
};
void inc(int& x) {
    x++;
}
int main(){
    return activateSimulation(weight);

}