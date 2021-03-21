export const AndroidTheme = {
    dark: false,
    colors: {
        primary: '#00695d',
        background: '#E1E2E1',
        card: '#00695d',
        text: '#fff',
        border: '#003d34',
        notification: '#43988a',

        primaryLight: '#43988a',
        primaryDark: '#003d34',
        primaryText: '#fff',
        
        accent: '#e83c53',
        accentLight: '#ff727f',
        accentDark: '#af002b',
        accentText: '#000',

        complementaryDark: '#E1E2E1',
        complentaryLight: '#F5F5F6',
    },
};

export const IosTheme = {
    dark: false,
    colors: {
        primary: '#00695d',
        background: '#fff',
        card: '#fff',
        text: '#43988a',
        border: '#003d34',
        notification: '#43988a',

        primaryLight: '#43988a',
        primaryDark: '#003d34',
        primaryText: '#fff',
        
        accent: '#e83c53',
        accentLight: '#ff727f',
        accentDark: '#af002b',
        accentText: '#000',

        complementaryDark: '#E1E2E1',
        complentaryLight: '#F5F5F6',
    },
};


export const getStateColor = (state:string) => {
    switch(state.toLowerCase().trim()) {
        case 'iniciada':
        case 'iniciado':
            return "#FED700";
        
        case 'revision':
        case 'en revision':
            return "#00A0C7";

        case 'rechazada':
            return '#e83c53';

        case 'aceptada':
            return '#43988a';
        
        default:
            return "#ccc"
    }
}; 
