import { prisma } from "@repo/database";
import Link from "next/link";
import { deleteMessage, markAsRead } from "../actions/messages";
import { Trash2, MailOpen, Mail } from "lucide-react";

export default async function MessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inbox</h1>
      
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border dark:border-gray-800">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-800">
            <tr>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Sender</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Subject</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Date</th>
              <th className="p-4 font-medium text-right text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {messages.map(msg => (
              <tr key={msg.id} className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${msg.isRead ? 'opacity-70' : 'bg-blue-50/30 dark:bg-blue-900/10'}`}>
                <td className="p-4">
                  <div className={`font-medium ${!msg.isRead && 'text-blue-600 dark:text-blue-400'}`}>{msg.senderName}</div>
                  <div className="text-sm text-gray-500">{msg.senderEmail}</div>
                </td>
                <td className="p-4">
                  <Link href={`/messages/${msg.id}`} className="hover:underline font-medium">
                    {msg.subject}
                  </Link>
                  {msg.attachments.length > 0 && <span className="ml-2 text-[10px] uppercase font-bold tracking-wider bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Attachments</span>}
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    {!msg.isRead && (
                      <form action={async () => { "use server"; await markAsRead(msg.id); }}>
                        <button type="submit" className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors" title="Mark as read">
                          <MailOpen className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                    <form action={async () => { "use server"; await deleteMessage(msg.id); }}>
                      <button type="submit" className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr><td colSpan={4} className="p-12 text-center text-gray-500">Inbox is empty.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
