import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamationTriangle, faPen } from '@fortawesome/free-solid-svg-icons';

interface EditConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    connectionName: string;
    integrationName: string;
}

export default function EditConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    connectionName,
    integrationName,
}: EditConfirmationModalProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>

                                <div className="flex flex-col items-start gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 shadow-sm border border-amber-100">
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-amber-500 text-xl" />
                                    </div>

                                    <div className="mt-2 text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-bold leading-6 text-slate-900 flex items-center gap-2"
                                        >
                                            <FontAwesomeIcon icon={faPen} className="text-slate-400 text-sm" />
                                            Change to Existing Connection
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-[15px] text-slate-600 mb-4 leading-relaxed">
                                                Changes may disrupt functionality and impact data flow.
                                            </p>
                                            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                                                <p className="text-sm text-slate-500">
                                                    Are you sure you want to make changes to <span className="font-semibold text-slate-900">{integrationName}</span> "{connectionName}" connection?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button
                                        type="button"
                                        className="flex-1 justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-200"
                                        onClick={onClose}
                                    >
                                        Undo
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 justify-center rounded-lg border border-transparent bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                                        onClick={onConfirm}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
