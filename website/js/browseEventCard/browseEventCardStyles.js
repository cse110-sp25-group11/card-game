export const styles = `
    .browse-event-card 
    {
        flex: 0 0 30%;
        scroll-snap-align: start;
        border: 1px solid #ddd;
        border-radius: 10px;
        background: white;
        padding: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        min-width: 250px;
    }
    .photo-container 
    {
        width: 100%;
        height: 150px;
        background-color: #eee;
        border-radius: 6px;
        overflow: hidden;
    }
    .photo-container img 
    {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .event-info 
    {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .event-info h3 
    {
        margin: 0;
        font-size: 1rem;
    }
`;
