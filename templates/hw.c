#include <stdio.h>
#include <stdbool.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>


#define MAX_ORDER 12
#define TAILLE_BUFFER 50

// Structure pour représenter la grille
struct Grid {
    unsigned int order;
    char letters[MAX_ORDER][MAX_ORDER];
    bool picked[MAX_ORDER][MAX_ORDER];
};
void reverseString(char *str) {
    if (str == NULL) {
        return; // Vérification pour éviter les pointeurs nuls
    }

    int length = strlen(str);
    int i = 0;
    int j = length - 1;

    // Inverser la chaîne tout en supprimant les caractères vides
    while (i < j) {
        while (i < j && isspace(str[i])) {
            i++;
        }
        while (i < j && isspace(str[j])) {
            j--;
        }
        if (i < j) {
            char temp = str[i];
            str[i] = str[j];
            str[j] = temp;
            i++;
            j--;
        }
    }
}
//inverser chaine 
/**
void reverseString(char *str) {
    if (str == NULL) {
        return;
    }

    int length = strlen(str);

    for (int i = 0; i < length / 2; i++) {
        char temp = str[i];
        str[i] = str[length - 1 - i];
        str[length - 1 - i] = temp;
    }
}
*/

// Fonction pour lire la grille et les mots cachés à partir de l'entrée standard
void lireGrilleEtMots(struct Grid *grid, char *buffer, char **motCaches , int *nombreMot) {
    //char buffer[TAILLE_BUFFER + 1];
    unsigned int row = 0;

    grid->order = strlen(fgets(buffer, MAX_ORDER + 3, stdin))-1 ;
    printf("order=%d \n ",grid->order);
    while (grid->order > row) {
        for(unsigned int col = 0; col < grid->order ; col++){
	grid->letters[row][col] = buffer[col];
	grid->picked[row][col] = false;
	
	}
	fgets(buffer, MAX_ORDER+3, stdin);
	row++;
    }
    
    do{
    
       strcpy(motCaches[(*nombreMot)++],buffer);
           
	  //strcpy(buffer,motCaches[(*nombreMot)++]);
	   
           //reverseString(mot);

    }while(fgets(buffer, MAX_ORDER + 3 , stdin) != NULL);
}

// Fonction pour vérifier si un mot est présent dans la grille
bool chercherMot(struct Grid *grid, char *word) {
    int wordLen = strlen(word)-1;

    // Parcourir la grille
    for (int i = 0; i < grid->order; i++) {
        for (int j = 0; j < grid->order; j++) {
            if (grid->letters[i][j] == word[0]) {
                // Essayer de trouver le mot dans toutes les directions
		
                // Horizontale droite
                if (j + wordLen <= grid->order) {
                    bool found = true;
                    for (int k = 0; k < wordLen; k++) {
			    
                        if (grid->letters[i][j + k] != word[k]) {
                            found = false;
                            break;
                        }
                    }
                    if (found) {
                        // Marquer les lettres comme utilisées
                        for (int k = 0; k < wordLen; k++) {
                            grid->picked[i][j + k] = true;
                        }
                        return true;
                    }
                }

                // Verticale bas
                if (i + wordLen <= grid->order) {
                    bool found = true;
                    for (int k = 0; k < wordLen; k++) {
                        if (grid->letters[i + k][j] != word[k]) {
                            found = false;
                            break;
                        }
                    }
                    if (found) {
                        // Marquer les lettres comme utilisées
                        for (int k = 0; k < wordLen; k++) {
                            grid->picked[i + k][j] = true;
                        }
                        return true;
                    }
                }

                // Diagonale bas droite
                if (i + wordLen <= grid->order && j + wordLen <= grid->order) {
                    bool found = true;
                    for (int k = 0; k < wordLen; k++) {
                        if (grid->letters[i + k][j + k] != word[k]) {
                            found = false;
                            break;
                        }
                    }
                    if (found) {
                        // Marquer les lettres comme utilisées
                        for (int k = 0; k < wordLen; k++) {
                            grid->picked[i + k][j + k] = true;
                        }
                        return true;
                    }
                }
            }
        }
    }

    return false; // Le mot n'a pas été trouvé
}

//fonction pour print 
void afficherGrille(struct Grid *grid){
for(unsigned int i = 0; i < grid -> order ; i++){

for(unsigned int j = 0; j < grid->order;j++){
printf(" %c ",grid->letters[i][j]);
printf(" %d ",grid->picked[i][j]);
}
printf("\n");
}
}
// Fonction pour résoudre la grille de mots cachés
void resoudreGrille(struct Grid *grid, char **hiddenWords, int numWords) {
    for (int i = 0; i < numWords; i++) {
        if (chercherMot(grid, hiddenWords[i])) {
            printf("%s", hiddenWords[i]);
        }
    }

    // Afficher les lettres restantes dans l'ordre
    for (int i = 0; i < grid->order; i++) {
        for (int j = 0; j < grid->order; j++) {
            if (!grid->picked[i][j]) {
                printf("%c", grid->letters[i][j]);
            }
        }
    }
    printf("\n");
}

int main(void) {
   char buffer[TAILLE_BUFFER];
    struct Grid grid;
    char *hiddenWords[MAX_ORDER + 5];
    int numWords = 0;

    grid.order = 0;

    // Lire la grille et les mots cachés depuis l'entrée standard
    lireGrilleEtMots(&grid , buffer , hiddenWords , &numWords);
	for(int i = 0 ; i < numWords ; i++){
	    printf("%s \n",hiddenWords[i]);
	}
    
    afficherGrille(&grid);
    // Résoudre la grille de mots cachés
    resoudreGrille(&grid, hiddenWords, numWords);
//afficher
    afficherGrille(&grid);

    // Libérer la mémoire allouée pour les mots cachés
    //for (int i = 0; i < numWords; i++) {
      //  free(hiddenWords[i]);
    //}

    return 0;
}

