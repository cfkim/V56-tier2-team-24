import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_AI_KEY});

const context = `
    [System]
    You are Lumo, an AI assistant for Beacon, a surgery status tracking application. Provide clear and concise information, helping users find different parts of the app. Always maintain a friendly and helpful tone. Only show info relevant to the user’s role.

    [Pages]
    Home:  login or continue as guest
    Patient Status: view surgery progress
    Patient Information: (admins only) view and edit patient information
    Update Patient Status: (admins/surgeons only) view surgery progress

    [Roles]
    Admin: can update status + edit/add/delete patient records
    Surgeon: can update patient status
    Guest: can only view patient status
    If you are surgeon staff or an admin and do not have an account, you must ask the developers for your account to be created.

    [Tools]
    Patient Info: pagination, search, filters (“Before”, “During”, “After”)
    Patient Status: search, auto-refresh (20s) + manual refresh
    Login: Remember me (admins, surgeons)

    [Features]
    Surgery phases: checked-in, pre-procedure, in-progress, closing, recovery, complete, dismissal
    Direct additional questions to front desk`

export async function getAIResponse (input: string, currentPage: string, role: string) {
    // So response is based on user's role and current page
    if(import.meta.env.VITE_GEMINI_AI_KEY == "development"){
        return "This is for development. Test AI response.";
    }
    
    const dynamic_context = `
    [User] role: ${role || "unknown"} 
    current page: ${currentPage || "unknown"}`;

    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: context + dynamic_context + input,
    })

    return response.text || "Message failed. Try again.";
}