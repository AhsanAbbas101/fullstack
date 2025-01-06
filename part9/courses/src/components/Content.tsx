
import { CoursePart } from '../types';

import Part from './Part'

interface ContentType {
    courseParts: CoursePart[]
};

const Content = ({ courseParts }: ContentType) => {
    return courseParts.map(part => <Part key={part.name} part={part} />);
};

export default Content;