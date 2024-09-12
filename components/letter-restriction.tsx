interface LetterRestrictionProps {
    limit : number;
    currentLength : number;
}

const LetterRestriction = ({ limit, currentLength} : LetterRestrictionProps) => {
    return ( 
        <div className="">
            <span className="text-xs text-gray-200/60">
                {currentLength} / {limit}
            </span>
        </div>
     );
}
 
export default LetterRestriction;