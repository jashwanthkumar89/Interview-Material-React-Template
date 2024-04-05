export interface participantsType {
    participants: participants[],
    sortFunction: (type:string, isAscending:boolean)=>void,
    dataLoaded: boolean
}

export interface ParticipantInfoType {
    participants: participants[];
    dataLoaded: boolean
    // countOfCodes: number;
}

export interface participants {
    name: string;
    count: number;
    diagnoses: codeType[];
    id: number
}

export interface codeType {
    icdCode: string;
    timestamp: string;
}
