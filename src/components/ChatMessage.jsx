import { formatTime } from '../utils/helpers';

export default function ChatMessage({ message, isOwn }) {
  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-slide-in`}
    >
      <div
        className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-md ${
          isOwn
            ? 'bg-gradient-to-br from-accent-500 to-accent-600 text-white rounded-br-sm shadow-accent-500/20'
            : 'bg-dark-700/80 text-text-primary border border-border/50 rounded-bl-sm backdrop-blur-sm'
        }`}
      >
        {!isOwn && (
          <p className="text-xs font-semibold text-accent-400 mb-1">
            {message.userName}
          </p>
        )}
        <p className="text-sm leading-relaxed">{message.message}</p>
        <p
          className={`text-xs mt-1 ${
            isOwn ? 'text-white/60' : 'text-text-muted'
          }`}
        >
          {formatTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}
