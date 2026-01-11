import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExclamation } from '@fortawesome/free-solid-svg-icons';

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
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-50 sm:mx-0 sm:h-10 sm:w-10">
                                        <FontAwesomeIcon icon={faExclamation} className="text-yellow-400 text-lg" />
                                    </div>

                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-bold leading-6 text-gray-900"
                                        >
                                            Change to Existing Connection
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-900 mb-3 font-medium">
                                                Changes may disrupt functionality and impact data flow.
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to make changes to {integrationName} "{connectionName}" connection?
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3 justify-end">
                                    <button
                                        type="button"
                                        className="flex-1 justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Undo
                                    </button>
                                    <button
                                        type="button"
                                        className="flex-1 justify-center rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
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
