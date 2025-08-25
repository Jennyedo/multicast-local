import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "MultiCast Local: Create Multicast Group",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const block = chain.mineBlock([
            Tx.contractCall('multicast-local-manager', 'create-group', 
                [
                    types.utf8('TestGroup'),
                    types.utf8('Local network test group'),
                    types.principal(deployer.address)
                ], 
                deployer.address)
        ]);

        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk();
    }
});

Clarinet.test({
    name: "MultiCast Local: Add Group Member",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const block = chain.mineBlock([
            Tx.contractCall('multicast-local-manager', 'add-group-member', 
                [
                    types.uint(1),
                    types.principal(deployer.address),
                    types.uint(2)  // Member role
                ], 
                deployer.address)
        ]);

        assertEquals(block.receipts.length, 1);
        block.receipts[0].result.expectOk();
    }
});