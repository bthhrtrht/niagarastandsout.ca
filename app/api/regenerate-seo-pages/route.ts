import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST() {
  try {
    const { stdout, stderr } = await execAsync(
      'npx tsx scripts/generateSeoPages.ts --overwrite',
      { cwd: process.cwd() }
    );
    console.log(stdout, stderr);
    return NextResponse.json({ success: true, output: stdout });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
