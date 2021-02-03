export interface Order {
    id: string;
    status: string;
    priority: string;
    client: string;
    employee: string,
    dateOfCreation: string,
    dateOfAssignment: string;
    dateOfCompletion: string;
    address: string;
    price: number;
}