export const useBlogCategories = () => {
    const existingCategories = [
        {
            label : "Allgemein",
            value : "all"
        },
        {
            label : "Inserate",
            value : "inserate"
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
            label : "Mein Profil",
            value : "profile"
        },
        {
            label : "Konversationen",
            value : "chat"
        },
        {
            label : "Abonnements",
            value : "abo"
        },
        {
            label : "Tipps & Tricks",
            value : "tipps"
        },
        {
            label : "News",
            value : "news"
        }
    ]

    return existingCategories;
}