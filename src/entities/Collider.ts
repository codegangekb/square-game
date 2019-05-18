abstract class Collider {
    bounced: boolean;
    trigger: boolean;

    protected constructor(protected transform, private game) {}
}
