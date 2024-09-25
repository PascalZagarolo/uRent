export const useBlogCategories = () => {
    const existingCategories = [
        {
            label : "Allgemein",
            value : "all"
        },
        {
            label : "Abonnements",
            value : "abo"
        },
        {
            label : "Dashboard",
            value : "dashboard"
        },
        {
            label : "Einstellungen",
            value : "settings"
        },
        {
            label : "Inserate",
            value : "inserate"
        },
        {
            label : "Konversationen",
            value : "chat"
        },
        {
            label : "Mein Profil",
            value : "profile"
        },
        {
            label : "News",
            value : "news"
        },
        {
            label : "Tipps & Tricks",
            value : "tipps"
        },
        
    ]

    return existingCategories;
}