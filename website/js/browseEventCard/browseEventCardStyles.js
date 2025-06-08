export const styles = `
    .browse-event-card 
    {
        /*Coloring*/
        background: white;

        /*Spacing*/
        padding: 10px;

        /*Layout*/
        flex: 0 0 30%;
        min-width: 250px;
        
        scroll-snap-align: start;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .photo-container 
    {
        /*Coloring*/
        background-color: #eee;

        /*Layout*/
        width: 100%;
        height: 150px;
        
        border-radius: 6px;
        overflow: hidden;
    }

    .photo-container img 
    {
        /*Layout*/
        width: 100%;
        height: 100%;
        
        object-fit: cover;
    }
        
    .event-info 
    {
        /*Spacing*/
        margin-top: 10px;
        
        /*Layout*/
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .event-info h3 
    {
        /*Text*/
        font-size: 1rem;

        /*Spacing*/
        margin: 0;
    }
`;
