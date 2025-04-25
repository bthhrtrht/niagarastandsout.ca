import { syncMetaobjectsToJson } from '@/scripts/metaobjects';

export async function POST() {
  await syncMetaobjectsToJson();
  return new Response('Synced Metaobjects ', { status: 200 });
}
