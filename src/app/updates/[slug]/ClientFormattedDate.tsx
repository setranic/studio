"use client";

import { useEffect, useState } from 'react';
import type { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ClientFormattedDateProps {
    date: Timestamp | string | undefined;
}

export default function ClientFormattedDate({ date }: ClientFormattedDateProps) {
    const [formattedDate, setFormattedDate] = useState<string>('');

    useEffect(() => {
        if (!date) {
            setFormattedDate("Fecha no disponible");
            return;
        }
        try {
            // Firestore Timestamps have a toDate() method. Serialized dates are strings.
            const dateObj = typeof date === 'string' ? new Date(date) : (date as Timestamp).toDate();
            setFormattedDate(format(dateObj, "dd 'de' MMMM, yyyy", { locale: es }));
        } catch (error) {
            console.error("Error formatting date:", error);
            setFormattedDate("Fecha inválida");
        }
    }, [date]);

    return <span>{formattedDate}</span>;
}
