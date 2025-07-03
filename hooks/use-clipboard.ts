"use client";

import { useState, useCallback, useEffect, useRef } from 'react';

export const useClipboard = (timeout = 1500) => {
    const [copied, setCopied] = useState(false);
    const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const copy = useCallback((text: string) => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                if (timeoutIdRef.current) {
                    clearTimeout(timeoutIdRef.current);
                }
                timeoutIdRef.current = setTimeout(() => {
                    setCopied(false);
                }, timeout);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                setCopied(false);
            });
        }
    }, [timeout]);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, []);

    return { copy, copied };
};
