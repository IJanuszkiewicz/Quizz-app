export function randomLetters(n: number): string[]{
    const letters = generateAlphabet(n);
    let currentIndex = letters.length, randomIndex

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random()*currentIndex)
        currentIndex--;

        [letters[currentIndex], letters[randomIndex]] = [letters[randomIndex], letters[currentIndex]]
    }
    return letters
}

function generateAlphabet(n: number): string[]{
    const alphabetStart =  'a'.charCodeAt(0)
    const letters: string[] = []

    for(let i = 0; i < n; i++){
        letters.push(String.fromCharCode(alphabetStart + i))
    }
    return letters
}