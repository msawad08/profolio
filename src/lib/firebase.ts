import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, logEvent, Analytics } from "firebase/analytics";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    Timestamp,
    Firestore
} from "firebase/firestore";
import { firebaseConfig } from "@/config/firebaseConfig";

// Initialize Firebase only if it hasn't been initialized
let app;
let analytics: Analytics;
let db: Firestore;

if (typeof window !== 'undefined' && !getApps().length) {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    db = getFirestore(app);
}

// Contact form submission
export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    timestamp?: Timestamp;
}

export const submitContactForm = async (formData: ContactFormData) => {
    try {
        const contactsRef = collection(db, 'contacts');
        const docRef = await addDoc(contactsRef, {
            ...formData,
            timestamp: serverTimestamp()
        });

        // Log analytics event
        logEvent(analytics, 'contact_form_submitted', {
            form_id: 'contact_form'
        });

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting form:', error);

        // Log error event
        logEvent(analytics, 'contact_form_error', {
            error_message: (error as Error).message
        });

        throw error;
    }
};

// Page view tracking
export const trackPageView = (pageName: string) => {
    if (typeof window !== 'undefined' && analytics) {
        logEvent(analytics, 'page_view', {
            page_title: pageName,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
};

// Custom event tracking
export const trackEvent = (eventName: string, eventParams = {}) => {
    if (typeof window !== 'undefined' && analytics) {
        logEvent(analytics, eventName, eventParams);
    }
};

export { app, analytics, db };