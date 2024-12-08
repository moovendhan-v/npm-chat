export interface UserFilters {
    id?: string;
    name?: string;
}

export type RequestOptions = {
    pagination?: PaginationOptions;
    selectedFields?: SelectedFields;
    select?: { [key: string]: boolean };
}

export type PaginationOptions = {
    skip: number;
    take: number;
};

export type SelectedFields = string[];
