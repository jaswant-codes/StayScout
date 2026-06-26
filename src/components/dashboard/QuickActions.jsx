import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Settings, LifeBuoy } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Add Property',
      description: 'List a new accommodation',
      icon: PlusCircle,
      path: '/owner/add-property',
      color: 'text-accent-400',
      bg: 'bg-accent-400/10'
    },
    {
      title: 'Edit Property',
      description: 'Manage existing listings',
      icon: Edit,
      path: '/owner/edit-property',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      title: 'Trust Center',
      description: 'Account & Security',
      icon: Settings,
      path: '/owner/trust-center',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    },
    {
      title: 'CRM Workspace',
      description: 'Manage student leads',
      icon: LifeBuoy,
      path: '/owner/crm',
      color: 'text-success',
      bg: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Link 
            key={index} 
            to={action.path}
            className="card glass p-5 flex items-start gap-4 hover:border-hover transition-colors group"
          >
            <div className={`p-3 rounded-xl ${action.bg}`}>
              <Icon className={`w-6 h-6 ${action.color}`} />
            </div>
            <div>
              <h4 className="text-lg font-medium text-white group-hover:text-accent-400 transition-colors">
                {action.title}
              </h4>
              <p className="text-sm text-muted mt-1">
                {action.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default QuickActions;
