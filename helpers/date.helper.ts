import { intervalToDuration } from 'date-fns';
import GraphCMSSystemFields from '../graphql/models/common/systemFields.model';

export default class DateHelper {
    static isNew = (createdAt: GraphCMSSystemFields['createdAt']) => {
        const createdInterval = intervalToDuration({
            start: new Date(createdAt),
            end: new Date()
        });
        // Product is new if its creation date is less than a month
        return !createdInterval?.years && !createdInterval?.months;
    };
}
