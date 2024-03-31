const ProfanityFilter = (checkedWord : string) => {
    //filter language
    const profanities = [
        'Arsch',
        'Fotze',
        'Hure',
        'Hitler',
        'Miststück',
        'Schlampe',
        'Schwuchtel',
        'Wichser',
        'Wuppertal',
        'Zigeuner',
    ]

    //case insensitive check
    const lowerCaseCheckedWord = checkedWord.toLowerCase();
    
    //case insensitive check with words of profanities array
    const containsProfanity = profanities.some((profanity) =>
        lowerCaseCheckedWord.includes(profanity.toLowerCase())
    );

    return containsProfanity;
}
 
export default ProfanityFilter;