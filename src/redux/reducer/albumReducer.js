import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// async thunk to fetch an album

export const fetchAlbums = createAsyncThunk('albums/fetchAlbums',
    async ()=>{
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if(!response.ok){
            throw new Error('Failed to fetch albums')
        }
        return response.json();
    }
)

// async thunk to update an album
export const updateAlbumApi  = createAsyncThunk('albums/updateAlbums',
    async(album)=>{
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(album),
        });
        if (!response.ok) {
            throw new Error("Failed to update album")
        }
        return response.json();
    }
)

// Async thunk to delete an album
export const deleteAlbumApi = createAsyncThunk(
    'albums/deleteAlbum',
    async (albumId) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete album');
        }
        return albumId;
    }
);
const INITIAL_STATE = {
    apiData:[],
    status:'',
    error:null,
}

const albumSlice = createSlice({
    name: "Albums",
    initialState: INITIAL_STATE,
    reducers:{
        // Action to create a new album
        createAlbum: (state, action) => {
            state.apiData.push({
            id: state.apiData.length + 1, // Assuming id is unique
            title: action.payload,
            });
        },
        updateAlbumState: (state, action) => {
            const updateAlbumData = action.payload;
            const index = state.apiData.findIndex(album => album.id === updateAlbumData.id);
            if(index !== -1) {
                state.apiData[index] = updateAlbumData
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAlbums.pending, (state, action)=>{
            state.status = "Loading..."
        })
        .addCase(fetchAlbums.fulfilled, (state, action) => {
            state.status = 'Succeeded';
            state.apiData = action.payload;
        })
        .addCase(fetchAlbums.rejected , (state, action) => {
            state.status = 'Failed';
            state.error = action.error.message
        })
        .addCase(updateAlbumApi.pending, (state, action) => {
            state.status = 'Updating album...';
        })
        .addCase(updateAlbumApi.fulfilled, (state, action) => {
            state.status = 'Album updated';
            // Dispatch updateAlbumInState action to update the album in the state
            state.apiData.push(action.payload);
            albumSlice.caseReducers.updateAlbumState(state,action);
        })
        .addCase(updateAlbumApi.rejected, (state, action) => {
            state.status = 'Failed to update album';
            state.error = action.error.message;
        })
        .addCase(deleteAlbumApi.pending, (state, action) => {
            state.status = 'Deleting album...';
        })
        .addCase(deleteAlbumApi.fulfilled, (state, action) => {
            state.status = 'Album deleted';
        })
        .addCase(deleteAlbumApi.rejected, (state, action) => {
            state.status = 'Failed to delete album';
            state.error = action.error.message;
        });
    }
})

export const albumReducer = albumSlice.reducer;
export const {createAlbum, updateAlbumState } = albumSlice.actions;