
import { CoursePart } from '../types';

interface ContentType {
    courseParts: CoursePart[]
};

const Content = ({ courseParts }: ContentType) => {
    return courseParts.map(part => <p>{part.name} {part.exerciseCount}</p>);
};

export default Content;