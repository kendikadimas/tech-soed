import React from 'react';
import ProjectEditor from '../../../components/ProjectEditor';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  return <ProjectEditor projectId={id} />;
}
