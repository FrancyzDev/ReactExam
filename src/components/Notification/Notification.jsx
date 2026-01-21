import '../../App.css';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export function Notification({
                                 text,
                                 type = 'success',
                                 duration = 2000,
                                 onClose
                             }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                startExitAnimation();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration]);

    const startExitAnimation = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, 300);
    };

    const handleClose = () => {
        startExitAnimation();
    };

    if (!isVisible) return null;

    const typeStyles = {
        success: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-800',
            icon: '✅',
            title: 'Успіх!'
        },
    };

    const style = typeStyles[type] || typeStyles.success;

    const notificationContent = (
        <div
            className={`transition-all duration-300 transform pointer-events-auto ${
                isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
        >
            <div className={`${style.bg} ${style.border} border-l-4 rounded-lg shadow-lg p-4 min-w-[300px] max-w-md`}>
                <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 text-xl">
                        {style.icon}
                    </div>
                    <div className="flex-1">
                        <div className={`font-semibold ${style.text}`}>
                            {style.title}
                        </div>
                        <div className={`mt-1 text-sm ${style.text}`}>
                            {text}
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className={`ml-4 flex-shrink-0 ${style.text} hover:opacity-70 transition-opacity cursor-pointer`}
                        aria-label="Закрити"
                    >
                        ✕
                    </button>
                </div>

                {duration && (
                    <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500"
                            style={{
                                animation: `progress ${duration}ms linear forwards`
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        notificationContent, document.getElementById('notification-portal')
    );
}