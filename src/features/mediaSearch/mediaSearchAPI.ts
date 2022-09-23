// A mock function to mimic making an async request for data
import {client} from '../../utils/client'
import {SearchTerm} from './types';
const API_URL = 'https://itunes.apple.com/search';

export async function fetchMedia(params: SearchTerm)
{
    const response = await client.get(API_URL + '?media=music&term=' + params.searchTerm + '&limit=' + 10 + '&offset=' + params.offset);
    return response
    /*  return new Promise<{ data: string }>((resolve) =>
        setTimeout(() => resolve({ data: searchTerm }), 500)
      );*/
}
