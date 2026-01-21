import React from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';

export function ConfirmModal({
                                 isOpen,
                                 onConfirm,
                                 onCancel,
                                 title = "Підтвердження",
                                 message = "Ви впевнені, що хочете продовжити?",
                                 confirmText = "Так, видалити",
                                 cancelText = "Скасувати",
                             }) {
    if (!isOpen) return null;

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    const modalContent = (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 p-4"
            onClick={handleBackgroundClick}
        >
            <div
                className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            >
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600">
                        {message}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-5 py-2.5 text-sm font-medium text-red-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent, document.getElementById('modal-portal')
    );
}