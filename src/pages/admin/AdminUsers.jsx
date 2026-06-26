import React, { useState } from 'react';
import { useAdminUsers } from '../../hooks/admin/useAdminUsers';
import UserStatsBar from '../../components/admin/users/UserStatsBar';
import UserFilters from '../../components/admin/users/UserFilters';
import UserTable from '../../components/admin/users/UserTable';
import UserDetailsDrawer from '../../components/admin/users/UserDetailsDrawer';
import BulkActionsBar from '../../components/admin/users/BulkActionsBar';

export default function AdminUsers() {
  const {
    users,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    selectedIds,
    toggleSelect,
    selectAll,
    updateUserRole,
    updateUserStatus,
    bulkUpdateStatus,
    deleteUser,
    stats
  } = useAdminUsers();

  const [activeUserId, setActiveUserId] = useState(null);

  const activeUser = users.find(u => u.id === activeUserId);

  return (
    <div className="space-y-6 animate-fade-in pb-12 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-text-secondary text-sm">Manage students, owners, and their platform access.</p>
        </div>
      </div>

      <UserStatsBar stats={stats} loading={loading} />

      <div className="bg-dark-800 border border-border rounded-2xl overflow-hidden shadow-2xl">
        <UserFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onChange={setFilters}
        />
        
        <UserTable 
          users={users}
          loading={loading}
          selectedIds={selectedIds}
          onSelect={toggleSelect}
          onSelectAll={() => selectAll(users.map(u => u.id))}
          onRowClick={(user) => setActiveUserId(user.id)}
        />
      </div>

      <UserDetailsDrawer 
        user={activeUser}
        isOpen={!!activeUserId}
        onClose={() => setActiveUserId(null)}
        onRoleChange={updateUserRole}
        onStatusChange={updateUserStatus}
        onDelete={deleteUser}
      />

      <BulkActionsBar 
        selectedCount={selectedIds.length}
        onAction={(action, reason) => {
          if (action === 'suspend') bulkUpdateStatus('suspended', reason);
          if (action === 'ban') bulkUpdateStatus('banned', reason);
          if (action === 'restore') bulkUpdateStatus('active', reason);
        }}
      />
    </div>
  );
}
