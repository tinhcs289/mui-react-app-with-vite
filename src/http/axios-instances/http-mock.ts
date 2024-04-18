import Axios from "axios";
import MockAdapter from "axios-mock-adapter";

export const httpMock = Axios.create();
export const mockAdapter = new MockAdapter(httpMock);
