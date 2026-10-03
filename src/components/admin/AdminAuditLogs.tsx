'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, User, Filter } from 'lucide-react';
import { AuditLogItem } from '@/types';
import { db } from '@/lib/db/dbAdapter';

export function AdminAuditLogs() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);

  useEffect(() => {
    setLogs(db.getAuditLogs());
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#242625]">
          Audit Log Aktivitas Administratif
        </h2>
        <p className="text-xs text-[#5A605B]">
          Catatan permanen setiap tindakan Super Admin untuk memastikan transparansi dan keamanan.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] border-b border-[#E8E2D8] text-[#5A605B] uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Waktu (Timestamp)</th>
                <th className="py-3 px-4">Admin ID / Email</th>
                <th className="py-3 px-4">Jenis Tindakan</th>
                <th className="py-3 px-4">Target</th>
                <th className="py-3 px-4">Detail Perubahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D8]/60">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAF7F2]/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-[#5A605B] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#242625]">{log.adminEmail}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#8C6E2D]/10 text-[#8C6E2D] font-mono text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#5A605B]">{log.targetType}:{log.targetId}</td>
                  <td className="py-3.5 px-4 text-[#5A605B] max-w-md">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
