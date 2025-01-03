
interface TotalType {
    totalExercises: number
};

const Total = ({ totalExercises }: TotalType) => {
    return <p>Number of exercises {totalExercises}</p>;
};

export default Total;