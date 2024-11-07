'use client'
import { lazy, Suspense } from 'react'

const LoadingTemplate = lazy(() => import('@/components/v1/loadingTemplate'))

export default function Loading() {
  return (<section><LoadingTemplate /></section>);
}
