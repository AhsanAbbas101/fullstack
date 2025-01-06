
import { CoursePart } from '../types';

interface PartType {
    part: CoursePart
};

const Part = ({ part }: PartType) => {
    
    let render = null;
    switch (part.kind) {
        case "basic":
            render = (<>{part.description}</>);
            break;
        case "background":
            render = (<>
                {part.description} <br/> {part.backgroundMaterial}
            </>)
            break;
        case "group":
            render = (<>
                project exercises { part.groupProjectCount }
            </>)
            break;
        case "special":
            render = (<>
                required skills: {part.requirements.join(', ')}
            </>)
            break;
        default:
            console.log(`Unhandled discriminated union member: ${JSON.stringify(part)}`);
            render = null;
    }
    
    return (
        <div>
            
            <strong>{part.name} {part.exerciseCount}</strong><br/>
            {render}
            <br /><br />
        </div>
    )
};

export default Part;